
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/ProductUploadForm.module.css';

export default function ProductUploadForm() {
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [unidad, setUnidad] = useState('litro');
    const [precio, setPrecio] = useState(0);
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [tipoComercio, setTipoComercio] = useState('Kiosco/Despensa/Pequeño');
    const [nombreComercio, setNombreComercio] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('producto', producto);
        formData.append('cantidad', cantidad.toString());
        formData.append('unidad', unidad);
        formData.append('precio', precio.toString());
        formData.append('localidad', localidad);
        formData.append('provincia', provincia);
        formData.append('tipo_comercio', tipoComercio);
        formData.append('nombre_comercio', nombreComercio);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/newprod/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Producto subido exitosamente');
                router.push('/products');
            } else {
                throw new Error('Error al subir el producto');
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
                type="text"
                placeholder="Producto y marca"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                className={styles.inputField}
            />
            <input
                type="number"
                placeholder="Cantidad"
                value={cantidad || ''}
                onChange={(e) => setCantidad(e.target.value ? Number(e.target.value) : '')}
                className={styles.inputField}
            />
            <select
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
                className={styles.inputField}
            >
                <option value="kg">kg</option>
                <option value="litro">litros</option>
            </select>
            <input
                type="number"
                placeholder="Precio"
                value={precio || ''}
                onChange={(e) => setPrecio(e.target.value ? Number(e.target.value) : '')}
                className={styles.inputField}
            />
            <input
                type="text"
                placeholder="Barrio"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                className={styles.inputField}
            />
            <input
                type="text"
                placeholder="Ciudad"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className={styles.inputField}
            />
            <select
                value={tipoComercio}
                onChange={(e) => setTipoComercio(e.target.value)}
                className={styles.inputField}
            >
                <option value="Kiosco/Despensa/Pequeño">Kiosco/Despensa/Pequeño</option>
                <option value="Supermercado">Supermercado</option>
            </select>
            <input
                type="text"
                placeholder="Nombre del comercio"
                value={nombreComercio}
                onChange={(e) => setNombreComercio(e.target.value)}
                className={styles.inputField}
            />
            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>Subir Producto</button>
                <Link href="/products" passHref>
                    <button className={styles.submitButton}>Volver</button>
                </Link>
            </div>
        </form>
    );
}

