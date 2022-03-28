package org.mbozecki.domain.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.mbozecki.domain.models.BeatMP3;
import org.mbozecki.domain.models.BeatMP3Full;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
public class BeatMP3FullRepository implements PanacheRepository<BeatMP3Full> {

    @Transactional
    public BeatMP3Full findById(String id) {
        return find("guid", id).firstResult();
    }

}
