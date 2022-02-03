package org.mbozecki.domain.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * The user entity
 */
@Getter
@Setter
@Entity
@Table(name = "t_user")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @Id
    @Column(name = "guid")
    private String guid = UUID.randomUUID().toString();

    private String name;

    private String img_url;

    private String bio;

    private String email;

    private String firebase_id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> likedbeats;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> beatsincart;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> boughtbeats;


    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> soldbeats;


    private double bankaccount;
}
