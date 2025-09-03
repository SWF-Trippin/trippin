package com.springboot.be.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "outbox_event")
public class OutboxEvent {
    @Id
    private Long id;

    @Column(nullable = false, length = 64)
    private String aggregateType;

    @Column(nullable = false, length = 128)
    private String aggregateId;

    @Column(nullable = false, length = 128)
    private String eventType;

    @Column(columnDefinition = "jsonb", nullable = false)
    private String payload; // JSON string

    @Column(columnDefinition = "jsonb")
    private String headers; // optional JSON string

    @Column(nullable = false, length = 16)
    private String status; // NEW, PUBLISHING, SENT, FAILED

    @Column(nullable = false)
    private Integer attempts;

    @Column(nullable = false)
    private OffsetDateTime availableAt;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private OffsetDateTime updatedAt;

    private OffsetDateTime sentAt;
}
