package org.mbozecki.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.persistence.*;
import javax.transaction.Transactional;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Transactional
@Getter
@Setter
@Entity
@Table(name="t_beatMP3")
@JsonIgnoreProperties(ignoreUnknown = true)
public class BeatMP3 extends PanacheEntityBase {
    @Id
    @Column(name = "guid")
    private String guid = UUID.randomUUID().toString();

    public String beatid;

    public String path;

}
