package org.mbozecki.rs.api;


import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.mbozecki.domain.models.User;
import org.mbozecki.domain.repositories.UserRepository;
import org.mbozecki.domain.repositories.criteria.UserSearchCriteria;
import org.mbozecki.domain.repositories.criteria.models.PageResult;
import org.mbozecki.rs.dtos.UserDTO;
import org.mbozecki.rs.dtos.criteria.PageResultDTO;
import org.mbozecki.rs.dtos.criteria.UserSearchCriteriaDTO;
import org.mbozecki.rs.mappers.UserMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
@Path("/users")
@Tag(name = "users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserRestController {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;

    protected final Logger logger = Logger.getLogger(getClass().getName());

    @GET
    @Path("/{id}")
    @Operation(operationId = "getUserById", description = "Get user by ID")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "The corresponding user resource",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = UserDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad request"),
            @APIResponse(responseCode = "404", description = "Not found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    public Response getUserById(@PathParam("id") String id) {
        User user = userRepository.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        logger.log(Level.INFO, String.format("Successfully returned a record with id: %s", id));
        return Response.ok(userMapper.map(user)).build();
    }

    @GET
    @Operation(operationId = "getusersByCriteria", summary = "Get user by criteria", description = "This operation gets users based on certain criteria.")
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
    public Response getUserByCriteria(@BeanParam UserSearchCriteriaDTO criteriaDTO) {
        UserSearchCriteria criteria = userMapper.mapToSearchCriteria(criteriaDTO);
        PageResult<User> userPageResult = userRepository.searchByCriteria(criteria);
        logger.log(Level.INFO, "Records were successfully returned according to the given criteria");
        return Response.ok(userMapper.mapToPageResultDTO(userPageResult)).build();
    }

    @POST
    @Operation(operationId = "createUser", summary = "Create user", description = "This operations create a user")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Created",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = UserDTO.class))),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response createUser(@Valid UserDTO userDTO) {
        User user = userMapper.create(userDTO);
        userRepository.persist(user);
        logger.log(Level.INFO, "A new record was successfully created and added to the database");
        return Response.ok(userMapper.map(user)).build();
    }

    @PUT
    @Path("/{id}")
    @Operation(operationId = "updateUser", summary = "Update a user", description = "This operation updates an already existed user.")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "Updated",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON,
                            schema = @Schema(implementation = UserDTO.class))
            ),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Transactional
    public Response updateUser(@PathParam("id") String id, @Valid UserDTO userDTO) {
        User user = userRepository.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        userMapper.update(user, userDTO);
        return Response.ok(userMapper.map(user)).build();
    }

    @DELETE
    @Path("/{id}")
    @Operation(operationId = "deleteUser", summary = "Delete a user", description = "This operation deletes a user with given Id")
    @APIResponses({
            @APIResponse(responseCode = "204", description = "No content"),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error"),
    })
    @Transactional
    public Response deleteUser(@PathParam("id") String id) {
        User user  = userRepository.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        userRepository.delete(user);
        logger.log(Level.INFO, "Successfully deleted a record with id: %2s", id);
        return Response.noContent().build();
    }


}
