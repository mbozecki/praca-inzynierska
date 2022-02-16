package org.mbozecki.rs;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.servers.Server;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@OpenAPIDefinition(
        servers = {
                @Server(url = "http://localhost:8080/")
        },
        info = @Info(title = "Beat store API", description = "Beat store RS API", version = "1.0")
)
@ApplicationPath("/beat-store")
public class RestApplication extends Application {
}

