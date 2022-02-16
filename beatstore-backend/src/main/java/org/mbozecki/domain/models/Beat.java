package org.mbozecki.domain.models;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name="t_beat")
public class Beat extends PanacheEntityBase {
    @Id
    @Column(name = "guid")
    private String guid = UUID.randomUUID().toString();

    public String name;

    @Lob
    public byte[] beatimg;

    public Double price;

    @ElementCollection
    public List<String> genre = new ArrayList<String>();

    @Lob
    public byte[] beatmp3;

    public String producedby;
    public Integer howmanysold;
}
