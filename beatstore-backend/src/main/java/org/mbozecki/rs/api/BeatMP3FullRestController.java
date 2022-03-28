package org.mbozecki.rs.api;


import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.mbozecki.domain.models.BeatMP3Full;
import org.mbozecki.domain.repositories.BeatMP3FullRepository;
import org.mbozecki.rs.dtos.BeatMP3FullDTO;
import org.mbozecki.rs.mappers.BeatMP3FullMapper;
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
@Path("/beatmp3full")
@Tag(name = "full")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BeatMP3FullRestController {

    @Inject
    BeatMP3FullRepository beatmp3Repository;

    @Inject
    BeatMP3FullMapper beatmp3Mapper;

    protected final Logger logger = Logger.getLogger(getClass().getName());

    @GET
    @Path("/{id}")
    @Operation(operationId = "getBeat3fffById", description = "Get beat3 by ID")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "The corresponding beat resource",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BeatMP3FullDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad request"),
            @APIResponse(responseCode = "404", description = "Not found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    public Response getBeatById(@PathParam("id") String id) {
        BeatMP3Full beat = beatmp3Repository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        logger.log(Level.INFO, String.format("Successfully returned a record with id: %s", id));
        return Response.ok(beatmp3Mapper.map(beat)).build();
    }


    @POST
    @Operation(operationId = "createBeat3fff", summary = "Create beat3", description = "This operations creates a beat3")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Created",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = BeatMP3FullDTO.class))),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response createBeat(@Valid BeatMP3FullDTO beatDTO) {
        BeatMP3Full beat = beatmp3Mapper.create(beatDTO);
        beatmp3Repository.persist(beat);
        logger.log(Level.INFO, "A new record was successfully created and added to the database");
        return Response.ok(beatmp3Mapper.map(beat)).build();
    }

    @PUT
    @Path("/{id}")
    @Operation(operationId = "updateBeat3fff", summary = "Update a bea3t", description = "This operation updates an already existing beat3.")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "Updated",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = BeatMP3FullDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response updateBeat(@PathParam("id") String id, @Valid BeatMP3FullDTO beatDTO) {
        BeatMP3Full beat = beatmp3Repository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        beatmp3Mapper.update(beat, beatDTO);
        return Response.ok(beatmp3Mapper.map(beat)).build();
    }

    @DELETE
    @Path("/{id}")
    @Operation(operationId = "deleteBeat3fff", summary = "Delete a beat3", description = "This operation deletes a beat with given Id3")
    @APIResponses({
            @APIResponse(responseCode = "204", description = "No content"),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    @Transactional
    public Response deleteBeat(@PathParam("id") String id) {
        BeatMP3Full beat  = beatmp3Repository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        beatmp3Repository.delete(beat);
        logger.log(Level.INFO, "Successfully deleted a record with id: %2s", id);
        return Response.noContent().build();
    }


    @GET
    @Path("/beatid/{beatid}")
    @Operation(operationId = "getBeat3fffBybeatId", description = "Get beat3 by beatID")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "The corresponding beat resource",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BeatMP3FullDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad request"),
            @APIResponse(responseCode = "404", description = "Not found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    public Response getBeatByBeatId(@PathParam("beatid") String beatid) {
        BeatMP3Full beat = beatmp3Repository.findByBeatId(beatid);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        logger.log(Level.INFO, String.format("Successfully returned a record with id: %s", beatid));
        return Response.ok(beatmp3Mapper.map(beat)).build();
    }

}
