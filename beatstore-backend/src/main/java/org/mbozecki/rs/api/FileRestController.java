package org.mbozecki.rs.api;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.ResponseBuilder;
import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import java.nio.file.Files;
import java.nio.file.Paths;



@ApplicationScoped
@Path("/file")
public class FileRestController {
    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(MultipartFormDataInput input) throws IOException {
        System.out.println("Dziwn1e"+ input.toString());
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        // Get file data to save
        System.out.println("Dziwn2e"+ uploadForm.toString());
        List<InputPart> inputParts = uploadForm.get("attachment");
        for (InputPart inputPart : inputParts) {
            try {
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                String fileName = getFileName(header);
                // convert the uploaded file to inputstream
                InputStream inputStream = inputPart.getBody(InputStream.class, null);
                byte[] bytes = IOUtils.toByteArray(inputStream);
                //String path = System.getProperty("user.home") + File.separator + "uploads";
                File customDir = new File("elo");
                if (!customDir.exists()) {
                    customDir.mkdir();
                }
                fileName = customDir.getCanonicalPath() + File.separator + fileName;
                writeFile(bytes, fileName);
                return Response.status(200).entity("Uploaded file name : " + fileName+" . <br/> ").build();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return Response.status(200).entity("Uploaded").build();
    }
    @POST
    @Path("/download")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Consumes("application/x-www-form-urlencoded")
    public Response downloadFileWithPost(@FormParam("file") String file) {
        String path = System.getProperty("user.home") + File.separator + "uploads";
        File fileDownload = new File(path + File.separator + file);
        ResponseBuilder response = Response.ok((Object) fileDownload);
        response.header("Content-Disposition", "attachment;filename=" + file);
        response.type("audio/mpeg");
        return response.build();
    }
    @GET
    @Path("/download")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFileWithGet(@QueryParam("file") String file) {
        StreamingOutput fileStream =  new StreamingOutput() 
        {
            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException 
            {
                try
                {
                    java.nio.file.Path path = Paths.get("elo" + File.separator + file);
                    byte[] data = Files.readAllBytes(path);
                    output.write(data);
                    output.flush();
                } 
                catch (Exception e) 
                {
                    throw new WebApplicationException("File Not Found !!");
                }
            }
        };
        return Response
                .ok(fileStream, MediaType.APPLICATION_OCTET_STREAM)
                .header("content-disposition","attachment;filename=" + file)
                .build();
    }

    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> listFiles() {
        List<String> listFiles = new ArrayList<>();
        File fileFolder = new File("elo");
        File[] list = fileFolder.listFiles();
        for (File f: list) {
            if (!f.isDirectory()) {
                listFiles.add(f.getName());
            }
        }
        return listFiles;
    }
    private String getFileName(MultivaluedMap<String, String> header) {
        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {
                String[] name = filename.split("=");
                String finalFileName = name[1].trim().replaceAll("\"", "");
                return finalFileName;
            }
        }
        return "unknown";
    }
    // Utility method
    private void writeFile(byte[] content, String filename) throws IOException {
        File file = new File(filename);
        if (!file.exists()) {
            file.createNewFile();
        }
        FileOutputStream fop = new FileOutputStream(file);
        fop.write(content);
        fop.flush();
        fop.close();
    }

    @POST
    @Path("/uploadfull")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFullFile(MultipartFormDataInput input) throws IOException {
        System.out.println("Dziwn1e"+ input.toString());
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        // Get file data to save
        System.out.println("Dziwn2e"+ uploadForm.toString());
        List<InputPart> inputParts = uploadForm.get("attachment");
        for (InputPart inputPart : inputParts) {
            try {
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                String fileName = getFileName(header);
                // convert the uploaded file to inputstream
                InputStream inputStream = inputPart.getBody(InputStream.class, null);
                byte[] bytes = IOUtils.toByteArray(inputStream);
                //String path = System.getProperty("user.home") + File.separator + "uploads";
                File customDir = new File("full");
                if (!customDir.exists()) {
                    customDir.mkdir();
                }
                fileName = customDir.getCanonicalPath() + File.separator + fileName;
                writeFile(bytes, fileName);
                return Response.status(200).entity("Uploaded file name : " + fileName+" . <br/> ").build();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return Response.status(200).entity("Uploaded file name").build();
    }
    @POST
    @Path("/downloadfull")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Consumes("application/x-www-form-urlencoded")
    public Response downloadFullFileWithPost(@FormParam("file") String file) {
        String path = System.getProperty("user.home") + File.separator + "uploads";
        File fileDownload = new File(path + File.separator + file);
        ResponseBuilder response = Response.ok((Object) fileDownload);
        response.header("Content-Disposition", "attachment;filename=" + file);
        return response.build();
    }
    @GET
    @Path("/downloadful")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFullFileWithGet(@QueryParam("file") String file) {
        System.out.println("Download file "+file);
        File fileDownload = new File("full" + File.separator + file);
        ResponseBuilder response = Response.ok((Object) fileDownload);
        response.header("Content-Disposition", "attachment;filename=" + file);
        return response.build();
    }
}