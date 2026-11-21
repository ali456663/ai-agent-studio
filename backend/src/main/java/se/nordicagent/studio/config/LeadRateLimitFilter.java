package se.nordicagent.studio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Enkel hastighetsbegränsning per IP-adress för POST /api/leads (max 5 anrop per 10 minuter).
 */
@Component
public class LeadRateLimitFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS = 5;
    private static final long WINDOW_SECONDS = 600;

    private final ConcurrentHashMap<String, Deque<Instant>> requestLog = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        if ("POST".equalsIgnoreCase(request.getMethod()) && "/api/leads".equals(request.getRequestURI())) {
            String clientIp = extractClientIp(request);
            Instant now = Instant.now();
            Instant cutoff = now.minusSeconds(WINDOW_SECONDS);

            Deque<Instant> timestamps = requestLog.computeIfAbsent(clientIp, k -> new ConcurrentLinkedDeque<>());
            synchronized (timestamps) {
                while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(cutoff)) {
                    timestamps.pollFirst();
                }
                if (timestamps.size() >= MAX_REQUESTS) {
                    response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                    response.setContentType("application/json");
                    response.getWriter().write("{\"error\":\"För många förfrågningar. Försök igen om en stund.\"}");
                    return;
                }
                timestamps.addLast(now);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
