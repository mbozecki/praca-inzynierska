package org.mbozecki.rs.dtos;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.Getter;
import lombok.Setter;
import org.mbozecki.domain.models.Beat;

import javax.persistence.CascadeType;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@RegisterForReflection
public class UserDTO {
    private String guid;

    private String name;

    private String bio;

    private String email;

    private String firebase_id;

    private byte[] profilepicture;

    private List<Beat> likedbeats;

    private List<Beat> beatsincart;

    private List<Beat> boughtbeats;

    private List<Beat> soldbeats;

    private double bankaccount;

}
