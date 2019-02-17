package com.curso.backendmasNegocioMasFrotend.capanegocio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.curso.backendmasNegocioMasFrotend.capadatos.JpaUsuarioRepositorio;
import com.curso.backendmasNegocioMasFrotend.capadatos.Usuario;



@Service("usuarioServiceEjec")
public class UsuarioServicioEjec implements UsuarioServicio {

	
	@Autowired
	@Qualifier("jpaUsuarioRepositorio")
	private JpaUsuarioRepositorio jpaUsuarioRepositorio;
	
	@Override
	public List<Usuario> findAllUsuario() {
		// TODO Auto-generated method stub
		return jpaUsuarioRepositorio.findAll();
	}

	@Override
	public Usuario insertUsuario(Usuario usuario) {
		// TODO Auto-generated method stub
		return jpaUsuarioRepositorio.save(usuario);
	}

	@Override
	public Usuario updateUsuario(Usuario usuario) {
		// TODO Auto-generated method stub
		return jpaUsuarioRepositorio.save(usuario);
	}

	@Override
	public void deleteUsuario(int id) {
		jpaUsuarioRepositorio.deleteById(id);;
		
	}

}
