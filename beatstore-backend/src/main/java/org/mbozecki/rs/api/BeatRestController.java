package org.mbozecki.rs.api;


import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.mbozecki.domain.models.Beat;
import org.mbozecki.domain.repositories.BeatRepository;
import org.mbozecki.domain.repositories.criteria.BeatSearchCriteria;
import org.mbozecki.domain.repositories.criteria.models.PageResult;
import org.mbozecki.rs.dtos.BeatDTO;
import org.mbozecki.rs.dtos.criteria.BeatSearchCriteriaDTO;
import org.mbozecki.rs.dtos.criteria.PageResultDTO;
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
@Path("/beat")
@Tag(name = "beat")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BeatRestController {

    @Inject
    BeatRepository beatRepository;

    @Inject
    BeatMapper beatMapper;

    protected final Logger logger = Logger.getLogger(getClass().getName());

    @GET
    @Path("/{id}")
    @Operation(operationId = "getBeatById", description = "Get beat by ID")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "The corresponding beat resource",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BeatDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad request"),
            @APIResponse(responseCode = "404", description = "Not found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    public Response getBeatById(@PathParam("id") String id) {
        Beat beat = beatRepository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        logger.log(Level.INFO, String.format("Successfully returned a record with id: %s", id));
        return Response.ok(beatMapper.map(beat)).build();
    }

    @GET
    @Operation(operationId = "getbeatsByCriteria", summary = "Get beat by criteria", description = "This operation gets beats based on certain criteria.")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "OK",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = PageResultDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response getBeatByCriteria(@BeanParam BeatSearchCriteriaDTO criteriaDTO) {
        BeatSearchCriteria criteria = beatMapper.mapToSearchCriteria(criteriaDTO);
        PageResult<Beat> beatPageResult = beatRepository.searchByCriteria(criteria);
        logger.log(Level.INFO, "Records were successfully returned according to the given criteria");
        return Response.ok(beatMapper.mapToPageResultDTO(beatPageResult)).build();
    }

    @POST
    @Operation(operationId = "createBeat", summary = "Create beat", description = "This operations creates a beat")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Created",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = BeatDTO.class))),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response createBeat(@Valid BeatDTO beatDTO) {
        Beat beat = beatMapper.create(beatDTO);
        beatRepository.persist(beat);
        logger.log(Level.INFO, "A new record was successfully created and added to the database");
        return Response.ok(beatMapper.map(beat)).build();
    }

    @PUT
    @Path("/{id}")
    @Operation(operationId = "updateBeat", summary = "Update a beat", description = "This operation updates an already existing beat.")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "Updated",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = BeatDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response updateBeat(@PathParam("id") String id, @Valid BeatDTO beatDTO) {
        Beat beat = beatRepository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        beatMapper.update(beat, beatDTO);
        return Response.ok(beatMapper.map(beat)).build();
    }

    @DELETE
    @Path("/{id}")
    @Operation(operationId = "deleteBeat", summary = "Delete a beat", description = "This operation deletes a beat with given Id")
    @APIResponses({
            @APIResponse(responseCode = "204", description = "No content"),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    @Transactional
    public Response deleteBeat(@PathParam("id") String id) {
        Beat beat  = beatRepository.findById(id);
        if (beat == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        beatRepository.delete(beat);
        logger.log(Level.INFO, "Successfully deleted a record with id: %2s", id);
        return Response.noContent().build();
    }


}
