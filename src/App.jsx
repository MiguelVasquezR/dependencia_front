import React, { useReducer, useState, useEffect } from 'react';
import './styles.css';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import productoIMG from './producto.jpeg';
import axios from 'axios';

const initialState = {
  openModal: false,
  carrosProductos: [],
  ordenes: [],
  seeOrdenes: false,
  seeObtenerFolios: false,
  seeValidarFolio: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleModal':
      return { ...state, openModal: action.payload };
    case 'updateCarrosProductos':
      return { ...state, carrosProductos: action.payload };
    case 'updateOrdenes':
      return { ...state, ordenes: action.payload };
    case 'toggleSeeOrdenes':
      return { ...state, seeOrdenes: action.payload };
    case 'toggleSeeObtenerFolios':
      return { ...state, seeObtenerFolios: action.payload };
    case 'toggleSeeValidarFolio':
      return { ...state, seeValidarFolio: action.payload };
    default:
      return state;
  }
};

const productos = [
  {
    "nombre": "Laptop Dell Inspiron 15",
    "descripcion": "Laptop Dell con procesador Intel Core i5 y 8GB de RAM.",
    "precio_unitario": 700.00,
    "imagen": "https://m.media-amazon.com/images/I/51koixRrxgS.jpg"
  },
  {
    "nombre": "Proyector Epson X39",
    "descripcion": "Proyector Epson con 3500 lúmenes y resolución XGA.",
    "precio_unitario": 500.00,
    "imagen": "https://images-na.ssl-images-amazon.com/images/I/51eRaERNd-L._MCnd_AC_SR462,462_.jpg"
  },
  {
    "nombre": "Impresora HP LaserJet Pro MFP M428fdw",
    "descripcion": "Impresora multifunción láser con impresión, escaneo y copiado.",
    "precio_unitario": 300.00,
    "imagen": "https://d22k5h68hofcrd.cloudfront.net/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/W/1/W1A30A-1_T1679665609.png"
  },
  {
    "nombre": "Monitor Samsung 24\" Full HD",
    "descripcion": "Monitor de 24 pulgadas con resolución Full HD y panel IPS.",
    "precio_unitario": 150.00,
    "imagen": "https://m.media-amazon.com/images/I/81TjRLHaz1L._AC_SX522_.jpg"
  },
  {
    "nombre": "Teclado Mecánico Logitech G Pro",
    "descripcion": "Teclado mecánico para gaming con switches GX Blue.",
    "precio_unitario": 120.00,
    "imagen": "https://m.media-amazon.com/images/I/51HaCM8wFcL.__AC_SX300_SY300_QL70_ML2_.jpg"
  },
  {
    "nombre": "Ratón Inalámbrico Logitech MX Master 3",
    "descripcion": "Ratón inalámbrico con sensor Darkfield y hasta 4000 DPI.",
    "precio_unitario": 100.00,
    "imagen": "https://m.media-amazon.com/images/I/619PsOn2iLL._AC_SX679_.jpg"
  },
  {
    "nombre": "Disco Duro Externo Seagate 2TB",
    "descripcion": "Disco duro externo con capacidad de 2TB y USB 3.0.",
    "precio_unitario": 80.00,
    "imagen": "https://lumen.com.mx/Content/Images/productPics/disco-duro-seagate-expansion-port-2tb-marca-seagate-sku-316284.jpg"
  },
  {
    "nombre": "Router TP-Link Archer C7",
    "descripcion": "Router inalámbrico de doble banda con velocidad de hasta 1750Mbps.",
    "precio_unitario": 60.00,
    "imagen": "https://m.media-amazon.com/images/I/71fs7xQezEL._AC_SL1500_.jpg"
  },
  {
    "nombre": "Silla Ergonómica Herman Miller Aeron",
    "descripcion": "Silla ergonómica con soporte lumbar ajustable y diseño transpirable.",
    "precio_unitario": 1200.00,
    "imagen": "https://m.media-amazon.com/images/I/61pGv7rjd-L._AC_UF894,1000_QL80_.jpg"
  },


  {
    "nombre": "Mesa de Conferencias",
    "descripcion": "Mesa grande para conferencias con capacidad para 10 personas.",
    "precio_unitario": 700.00,
    "imagen": "https://m.media-amazon.com/images/I/41Fj97JZdQL.__AC_SX300_SY300_QL70_ML2.jpg"
  },
  {
    "nombre": "Proyector Interactivo SMART Board",
    "descripcion": "Proyector interactivo con tecnología táctil para presentaciones.",
    "precio_unitario": 1500.00,
    "imagen": "https://m.media-amazon.com/images/I/71ttXn-bMPL._SL1500_.jpg"
  },
  {
    "nombre": "Apple iPad Air",
    "descripcion": "Tablet Apple iPad Air con pantalla de 10.5 pulgadas y 64GB de almacenamiento.",
    "precio_unitario": 500.00,
    "imagen": "https://m.media-amazon.com/images/I/51140GGKlsL.__AC_SY445_SX342_QL70_ML2.jpg"
  },
  {
    "nombre": "Cámara Web Logitech C920",
    "descripcion": "Cámara web Full HD con micrófono estéreo integrado.",
    "precio_unitario": 70.00,
    "imagen": "https://m.media-amazon.com/images/I/71eGb1FcyiL._AC_SX522_.jpg"
  },
  {
    "nombre": "Proyector portátil Anker Nebula Capsule",
    "descripcion": "Proyector portátil con batería recargable y Android 7.1.",
    "precio_unitario": 300.00,
    "imagen": "https://m.media-amazon.com/images/I/5189c0SK5kL.__AC_SX300_SY300_QL70_ML2.jpg"
  },
  {
    "nombre": "Auriculares Bose QuietComfort 35 II",
    "descripcion": "Auriculares inalámbricos con cancelación de ruido activa.",
    "precio_unitario": 350.00,
    "imagen": "https://m.media-amazon.com/images/I/81+jNVOUsJL._AC_SY300_SX300_.jpg"
  }
]


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openModal, carrosProductos, ordenes, seeOrdenes, seeObtenerFolios, seeValidarFolio } = state;

  const agregarAlCarrito = (producto) => {
    dispatch({ type: 'updateCarrosProductos', payload: [...carrosProductos, { ...producto, cantidad: 1 }] });
  }

  const aumentarCantidad = (index) => {
    const newCarrosProductos = [...carrosProductos];
    newCarrosProductos[index].cantidad += 1;
    dispatch({ type: 'updateCarrosProductos', payload: newCarrosProductos });
  }

  const disminuirCantidad = (index) => {
    const newCarrosProductos = [...carrosProductos];
    if (newCarrosProductos[index].cantidad > 1) {
      newCarrosProductos[index].cantidad -= 1;
      dispatch({ type: 'updateCarrosProductos', payload: newCarrosProductos });
    }
  }

  const eliminarProducto = (index) => {
    const newCarrosProductos = carrosProductos.filter((_, i) => i !== index);
    dispatch({ type: 'updateCarrosProductos', payload: newCarrosProductos });
  }

  const handlePago = () => {
    const compra = {
      vendedor: { nombre: "Tienda Ofix", direccion: "Calle 123, Colonia Centro, CDMX" },
      comprador: { nombre: "Facultad Estadística e Informáitca", direccion: "Av. Universidad 3000, CDMX" },
      productos: carrosProductos,
    }
    axios.post('https://dependenciarest-production.up.railway.app/solicitar-compra', compra)
      .then(response => {
        const ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];
        alert(response.data);
        const numero = response.data.split(' ')[9];
        const orden = { "numOrden": numero }
        ordenes.push(orden);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));
        dispatch({ type: 'updateCarrosProductos', payload: [] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  const ModalCarrito = () => {
    return (
      <div className='modal'>
        <div className='closeModal'>
          <IoMdCloseCircleOutline onClick={() => dispatch({ type: 'toggleModal', payload: false })} size={50} className='btnClose' />
        </div>

        <h2>Carrito de Compras</h2>
        <p>Tu crédito es de $1,000,000 </p>

        <div className='scrollModal'>
          {carrosProductos.map((producto, index) => (
            <div key={index} className='cardModalItem'>
              <article>
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio_unitario}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <button style={{ backgroundColor: "#18529D", color: "white", border: "none", margin: "0 2px", width: "50px", height: "30px" }} onClick={() => aumentarCantidad(index)}>+</button>
                <button style={{ backgroundColor: "#18529D", color: "white", border: "none", margin: "0 2px", width: "50px", height: "30px" }} onClick={() => disminuirCantidad(index)}>-</button>
                <button style={{ backgroundColor: "#18529D", color: "white", border: "none", margin: "0 2px", width: "100px", height: "30px" }} onClick={() => eliminarProducto(index)}>Eliminar</button>
              </article>
            </div>
          ))}
        </div>

        <button onClick={handlePago} className='modalButton'>Pagar</button>
      </div>
    )
  }

  const CardProducto = ({ nombre, descripcion, precio_unitario, imagen }) => {
    return (
      <div className='cardContainer'>
        <picture>
          <img src={imagen} className='cardImages' alt={nombre} />
        </picture>

        <article className='cardArticle'>
          <h3 className='cardTitle'>{nombre}</h3>
          <p className='cardDecripcion'>{descripcion}</p>
          <p className='cardPrecio'>${precio_unitario}</p>
        </article>

        <div>
          <button onClick={() => agregarAlCarrito({ nombre, precio_unitario, imagen })} className='cardButton'>Agregar al carrito</button>
        </div>
      </div>
    )
  }

  const ModalOrdenesPago = () => {
    return (
      <div style={{ width: "500px", margin: "20px" }}>
        <h2>Ordenes de Compras</h2>
        <ul>
          {ordenes.map((orden, index) => (
            <li key={index}>{orden.numOrden}</li>
          ))}
        </ul>
      </div>
    )
  }

  const ModalObtenerFolios = () => {
    const [folios, setFolios] = useState([]);
    const [numOrden, setNumOrden] = useState('');
    const [error, setError] = useState('');

    const handleObtenerFolios = async (e) => {
      e.preventDefault();
      if (!numOrden) {
        setError('Por favor ingresa un número de orden válido.');
        return;
      }

      try {
        const res = await axios.get(`https://dependenciarest-production.up.railway.app/obtener-folios/${numOrden}`);
        const data = await res.data;
        setFolios(data.producto);
        setError('');
      } catch (err) {
        console.log(err);
        setError('Error al obtener los folios. Por favor inténtalo de nuevo.');
      }
    };

    return (
      <div>
        <h2>Obtener Folios</h2>
        <form onSubmit={handleObtenerFolios}>
          <label htmlFor="numOrden">Ingresa el Número de Orden</label>
          <input type="text" id="numOrden" value={numOrden} onChange={(e) => setNumOrden(e.target.value)} />
          <button className='btn-folio' type='submit'>Obtenerlos</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {
            folios.length > 0 &&
            folios.map((f, index) => (
              <li key={index}>{f.nombre}: {f.folio} </li>
            ))}
        </ul>
      </div>
    );
  };

  const ModalValidarFolio = () => {
    const [folio, setFolio] = useState('');
    const [mensaje, setMensaje] = useState('');


    const handleVlidarFolio = async (e) => {
      e.preventDefault();
      if (!folio) {
        setMensaje('Por favor ingresa un folio válido.');
        return;
      }

      try {
        const res = await axios.get(`https://dependenciarest-production.up.railway.app/validar-folio/${folio}`);
        const data = await res.data;
        console.log(data);
        setMensaje(data);
      } catch (err) {
        console.log(err);
        setMensaje('Error al validar el folio. Por favor inténtalo de nuevo.');
      }
    }

    return (
      <div>
        <h2>Obtener Folios</h2>
        <form onSubmit={handleVlidarFolio}>
          <label htmlFor="numOrden">Ingresa el Folio</label>
          <input type="text" id="numOrden" value={folio} onChange={(e) => setFolio(e.target.value)} />
          <button className='btn-folio' type='submit'>Validar</button>
        </form>
        <p>{mensaje}</p>
      </div>
    );




  }


  useEffect(() => {
    dispatch({ type: 'updateOrdenes', payload: JSON.parse(localStorage.getItem('ordenes')) || [] });
  }, []);

  return (
    <div className='mainContainer'>
      <div className='containter'>
        <h1 className='container-title'>Catálogo de productos</h1>
        <FaShoppingCart style={{cursor: "pointer"}} size={50} onClick={() => dispatch({ type: 'toggleModal', payload: true })} />
      </div>

      <section className='section-folio'>
        <button onClick={() => dispatch({ type: 'toggleSeeOrdenes', payload: !seeOrdenes })} className='btn-folio'>Ordenes Compra</button>
        <button onClick={() => dispatch({ type: 'toggleSeeObtenerFolios', payload: !seeObtenerFolios })} className='btn-folio'>Obtener Folios</button>
        <button onClick={() => dispatch({ type: 'toggleSeeValidarFolio', payload: !seeValidarFolio })} className='btn-folio'>Validar Folio</button>
      </section>

      {seeOrdenes && <ModalOrdenesPago />}
      {seeObtenerFolios && <ModalObtenerFolios />}
      {seeValidarFolio && <ModalValidarFolio />}

      <div className='containerCard'>
        {productos.map((producto, index) => (
          <CardProducto
            key={index}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio_unitario={producto.precio_unitario}
            imagen={producto.imagen}
          />
        ))}
      </div>
      {openModal && <ModalCarrito />}
    </div>
  );
}

export default App;
