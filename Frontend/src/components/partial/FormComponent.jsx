import '../../styles/form.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Api } from '../../services/Api.js';
import StorageService from '../../services/storageService.js';

export const FormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [successLoged, setSuccessLogin] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const body = {
      username: evt.target.username.value,
      password: evt.target.password.value
    };

    Api.post('login', { body })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.message);
          setSuccessLogin(false);
        } else {
          Api.defaultHeaders.Authorization = `Bearer ${res.authorizationToken}`;
          StorageService.setItem('token', res.authorizationToken);
          StorageService.setItem('roles', res.roles);
          navigate('/');
        }
      })
      .catch(err => {
        if (err.message) {
          setError(err.message);
          setSuccessLogin(false);
        }
        setError(String(err));
      });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-header"></div>
      <div className="form-content">
        <h3 className="form-title">Bienvenido</h3>
        <h5 className="form-subtitle">Ingrese sus datos</h5>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="username">Nombre de usuario</label>
            <FilledInput
              name="username"
              id="filled-adornment-username"
              type="text"
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <FilledInput
              name="password"
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <input className="submit-button" type="submit" value="Ingresar" />
        </div>
        {successLoged && <span className="form-success">Ingreso Correcto</span>}
        {error && <span className="form-error">{error}</span>}
      </div>
    </form>
  );
};
