package com.springboot.be.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;

@Entity
@Table(name = "survey")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * preferences 컬럼은 JSONB로 저장됩니다.
     * 예시 구조:
     * {
     *   "regions": ["제주","강원"],
     *   "terrains": ["해변","산"],
     *   "styles": ["hip","chic"],
     *   "themes": ["카페투어","사진명소"],
     *   "moods": ["노포 감성","로맨틱"]
     * }
     */

    //자바의 Map<String, List<String>> 같은 구조체를 JSON 문자열로 직렬화/역직렬화해서 DB에 넣고 꺼낼 수 있도록 Hibernate가 처리
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "preferences", columnDefinition = "jsonb")
    private Map<String, List<String>> preferences;
}
