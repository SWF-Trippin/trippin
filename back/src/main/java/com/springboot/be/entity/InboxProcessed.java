package com.springboot.be.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "inbox_processed")
public class InboxProcessed {
    @Id
    private Long id;

    @Column(nullable = false)
    private OffsetDateTime receivedAt = OffsetDateTime.now();
}
