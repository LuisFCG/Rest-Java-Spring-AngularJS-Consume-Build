package com.curso.backendmasNegocioMasFrotend.capanegocio;

import java.util.List;

import com.curso.backendmasNegocioMasFrotend.capadatos.Usuario;


public interface UsuarioServicio {

	List<Usuario> findAllUsuario();
	
	Usuario insertUsuario(Usuario usuario);
	
	Usuario updateUsuario(Usuario usuario);

     void deleteUsuario(int id);
	
}
