package org.mbozecki.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

@Transactional
@Getter
@Setter
@Entity
@Table(name="t_beat")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Beat extends PanacheEntityBase {
    @Id
    @Column(name = "guid")
    private String guid = UUID.randomUUID().toString();

    public String name;

    @Lob
    public byte[] beatimg;

    public Double price;

    public Double BPM;

    public Double likeNumber;

    public String genre;

    public String mp3ID;

    public String producedby;

    public Integer howmanysold;

    public String imgName;
}
