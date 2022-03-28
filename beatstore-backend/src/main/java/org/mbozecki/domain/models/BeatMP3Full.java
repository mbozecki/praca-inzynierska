package org.mbozecki.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.UUID;

@Transactional
@Getter
@Setter
@Entity
@Table(name="t_beatMP3Full")
@JsonIgnoreProperties(ignoreUnknown = true)
public class BeatMP3Full extends PanacheEntityBase {
    @Id
    @Column(name = "guid")
    private String guid = UUID.randomUUID().toString();

    public String beatid;

    @Lob
    public byte[] fullbeatmp3;

}