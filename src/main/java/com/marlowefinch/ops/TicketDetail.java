package com.marlowefinch.ops;

import java.time.LocalDate;

public record TicketDetail(long id, String orderRef, String customer, String carrier, String priority,
                           String status, LocalDate openedAt, LocalDate closedAt) {
}
