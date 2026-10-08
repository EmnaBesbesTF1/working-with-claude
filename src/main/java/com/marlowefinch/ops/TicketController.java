package com.marlowefinch.ops;

import java.time.Clock;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TicketController {

    static final int DEFAULT_LIMIT = 20;

    private final DashboardRepository repository;
    private final Clock clock;

    public TicketController(DashboardRepository repository, Clock clock) {
        this.repository = repository;
        this.clock = clock;
    }

    @GetMapping("/api/tickets/by-category")
    public List<TicketCategoryCount> byCategory(@RequestParam(required = false) String from,
                                                @RequestParam(required = false) String to) {
        return repository.ticketsByCategory(DateRange.resolve(from, to, clock));
    }

    @GetMapping("/api/tickets")
    public List<TicketDetail> inCategory(@RequestParam String category,
                                         @RequestParam(required = false) String from,
                                         @RequestParam(required = false) String to,
                                         @RequestParam(required = false, defaultValue = "" + DEFAULT_LIMIT) int limit) {
        return repository.ticketsInCategory(DateRange.resolve(from, to, clock), category, limit);
    }
}
