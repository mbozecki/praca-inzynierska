package org.mbozecki.domain.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.mbozecki.domain.models.BeatMP3;
import org.mbozecki.domain.models.BeatMP3Full;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
public class BeatMP3Repository implements PanacheRepository<BeatMP3> {

    @Transactional
    public BeatMP3 findById(String id) {
        return find("guid", id).firstResult();
    }

    @Transactional
    public BeatMP3 findByBeatId(String beatid) { return find("beatid", beatid).firstResult(); }
}
