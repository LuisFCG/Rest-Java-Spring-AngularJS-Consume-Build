package com.curso.backendmasNegocioMasFrotend.capanegocio;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.curso.backendmasNegocioMasFrotend.capadatos.Usuario;


@RestController
public class ControladorServicioRest {
	private static Log LOG = LogFactory.getLog(ControladorServicioRest.class);
	
	@Autowired
	@Qualifier("usuarioServiceEjec")
	private UsuarioServicio usuarioServicioEjec;
	
//METODO GET - CONSEGUIR LISTA REGISTROS DE USUARIOS	
		@RequestMapping(value = "/mostrarjson", method = RequestMethod.GET)
		 public List<Usuario> listaPersonas() {
			List<Usuario> lista = new ArrayList<Usuario>();
		    lista = usuarioServicioEjec.findAllUsuario();
		    return lista;
		    }
		
//INGRESAR REGISTRO
		 @RequestMapping(value = "/usuario", method = RequestMethod.POST)
		 public String insertarRegistro(@RequestBody Usuario usuario) {
			 LOG.info("LLega al metodo insertarUsuario_objeto usuario: "+usuario);
			 LOG.info("LLega al metodo insertarUsuario usuario.getCedula(): "+usuario.getCedula());
			 LOG.info("LLega al metodo insertarUsuario usuario.getId(): "+usuario.getId());
			 LOG.info("LLega al metodo insertarUsuario listaPersonas(): "+listaPersonas());
			 LOG.info("LLega al metodo insertarUsuario listaPersonas().size(): "+listaPersonas().size());
			 LOG.info("LLega al metodo insertarUsuario listaPersonas().size(): "+listaPersonas());
			 
			 int existe = 0;
			 for(int indice = 0;indice<listaPersonas().size();indice++)
			 {
				 if(usuario.getCedula() == listaPersonas().get(indice).getCedula()) {
					existe++; //Si usuario existe sumo un valor
				 }
			 }
			 
		if(existe > 0) {
			return "1";
			}else {
			usuarioServicioEjec.insertUsuario(usuario);
			}

		return "0";
    }

//MODIFICAR REGISTRO
		 @RequestMapping(value = "/usuario", method = RequestMethod.PUT)
		 public String modificarRegistro(@RequestBody Usuario usuario) {
			 LOG.info("LLega al metodo modificarUsuario_objeto usuario: "+usuario);
			 LOG.info("LLega al metodo modificarUsuario usuario.getCedula(): "+usuario.getCedula());
			 LOG.info("LLega al metodo modificarUsuario usuario.getId(): "+usuario.getId());
			 LOG.info("LLega al metodo modificarUsuario listaPersonas(): "+listaPersonas());
			 LOG.info("LLega al metodo modificarUsuario listaPersonas().size(): "+listaPersonas().size());
			 LOG.info("LLega al metodo modificarUsuario listaPersonas().size(): "+listaPersonas());
			 
			usuarioServicioEjec.insertUsuario(usuario);

		return "0";
    }
		 
	//ELIMINAR REGISTRO
		 @RequestMapping(value = "/eliminarregistro/{id}", method = RequestMethod.DELETE)
		 public void deleteConcepto(@PathVariable("id") int id) {
			 LOG.info("LLega al metodo eliminarRegistro id: "+id);
				
			 usuarioServicioEjec.deleteUsuario(id);
			
		 	 } 		
	
}
