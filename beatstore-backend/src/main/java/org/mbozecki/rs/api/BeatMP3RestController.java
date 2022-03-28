package org.mbozecki.rs.api;


import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.mbozecki.domain.models.Beat;
import org.mbozecki.domain.models.BeatMP3;
import org.mbozecki.domain.repositories.BeatMP3Repository;
import org.mbozecki.domain.repositories.BeatRepository;
import org.mbozecki.domain.repositories.criteria.BeatSearchCriteria;
import org.mbozecki.domain.repositories.criteria.models.PageResult;
import org.mbozecki.rs.dtos.BeatDTO;
import org.mbozecki.rs.dtos.BeatMP3DTO;
import org.mbozecki.rs.dtos.criteria.BeatSearchCriteriaDTO;
import org.mbozecki.rs.dtos.criteria.PageResultDTO;
import org.mbozecki.rs.mappers.BeatMP3Mapper;
import org.mbozecki.rs.mappers.BeatMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
@Path("/beatmp3")
@Tag(name = "beatmp3")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BeatMP3RestController {

    @Inject
    BeatMP3Repository beatmp3Repository;

    @Inject
    BeatMP3Mapper beatmp3Mapper;

    protected final Logger logger = Logger.getLogger(getClass().getName());

    @GET
    @Path("/{id}")
    @Operation(operationId = "getBeat3ById", description = "Get beat3 by ID")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "The corresponding beat resource",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BeatMP3DTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad request"),
            @APIResponse(responseCode = "404", description = "Not found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    public Response getBeatById(@PathParam("id") String id) {
        BeatMP3 beat = beatmp3Repository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        logger.log(Level.INFO, String.format("Successfully returned a record with id: %s", id));
        return Response.ok(beatmp3Mapper.map(beat)).build();
    }


    @POST
    @Operation(operationId = "createBeat3", summary = "Create beat3", description = "This operations creates a beat3")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Created",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = BeatMP3DTO.class))),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response createBeat(@Valid BeatMP3DTO beatDTO) {
        BeatMP3 beat = beatmp3Mapper.create(beatDTO);
        beatmp3Repository.persist(beat);
        logger.log(Level.INFO, "A new record was successfully created and added to the database");
        return Response.ok(beatmp3Mapper.map(beat)).build();
    }

    @PUT
    @Path("/{id}")
    @Operation(operationId = "updateBeat3", summary = "Update a bea3t", description = "This operation updates an already existing beat3.")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "Updated",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = BeatMP3DTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response updateBeat(@PathParam("id") String id, @Valid BeatMP3DTO beatDTO) {
        BeatMP3 beat = beatmp3Repository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        beatmp3Mapper.update(beat, beatDTO);
        return Response.ok(beatmp3Mapper.map(beat)).build();
    }

    @DELETE
    @Path("/{id}")
    @Operation(operationId = "deleteBeat3", summary = "Delete a beat3", description = "This operation deletes a beat with given Id3")
    @APIResponses({
            @APIResponse(responseCode = "204", description = "No content"),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    @Transactional
    public Response deleteBeat(@PathParam("id") String id) {
        BeatMP3 beat  = beatmp3Repository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        beatmp3Repository.delete(beat);
        logger.log(Level.INFO, "Successfully deleted a record with id: %2s", id);
        return Response.noContent().build();
    }


}
