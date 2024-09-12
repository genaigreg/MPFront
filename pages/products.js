import { useState, useEffect } from 'react';
import styles from '../styles/product-list.module.css';
import Link from 'next/link';

// URL base para los iconos
const ICON_BASE_URL = 'https://img.icons8.com/ios/50/000000/';

// Función para obtener el nombre del icono basado en el producto
const iconMap = {
    'leche': 'milk',
    'tomate': 'tomato',
    'pan': 'bread',
    'carne': 'meat',
    'agua': 'water',
    'queso': 'cheese',
    'crema': 'cow',
    'manzana': 'apple',
    'plátano': 'banana',
    'pollo': 'chicken',
    'arroz': 'rice',
    'pasta': 'pasta',
    'aceite': 'oil',
    'azúcar': 'sugar',
    'sal': 'salt',
    'harina': 'flour',
    'huevo': 'egg',
    'café': 'coffee',
    'té': 'tea',
    'mantequilla': 'butter',
    'yogur': 'yogurt',
    'jugo': 'juice',
    'papas': 'potato',
    'cebolla': 'onion',
    'zanahoria': 'carrot',
    'lechuga': 'lettuce',
    'pepino': 'cucumber',
    'pimiento': 'pepper',
    'calabacín': 'zucchini',
    'berenjena': 'eggplant',
    'maíz': 'corn',
    'guisantes': 'peas',
    'champiñones': 'mushrooms',
    'salsa': 'sauce',
    'mostaza': 'mustard',
    'mayonesa': 'mayonnaise',
    'ketchup': 'ketchup',
    'panceta': 'bacon',
    'jamón': 'ham',
    'salchicha': 'sausage',
    'pescado': 'fish',
    'mariscos': 'seafood',
    'pan de molde': 'sandwich_bread',
    'pan integral': 'whole_wheat_bread',
    'croissant': 'croissant',
    'galletas': 'cookies',
    'pastel': 'cake',
    'helado': 'ice_cream',
    'miel': 'honey',
    'cereal': 'cereal',
    'barritas': 'granola_bars',
    'chips': 'chips',
    'tortilla': 'tortilla',
    'hamburguesa': 'burger',
    'pizza': 'pizza',
    'lasagna': 'lasagna',
    'sopa': 'soup',
    'caldo': 'broth',
    'pasta de dientes': 'toothpaste',
    'jabón': 'soap',
    'shampoo': 'shampoo',
    'detergente': 'detergent',
    'papel higiénico': 'toilet_paper',
    'toallas': 'towels',
    'servilletas': 'napkins',
    'bolsas': 'bags',
    'esponja': 'sponge',
    'cepillo': 'brush',
    'limpiador': 'cleaner',
    'aceitunas': 'olives',
    'vinagre': 'vinegar',
    'salsa de soja': 'soy_sauce',
    'oregano': 'oregano',
    'pimienta': 'pepper',
    'canela': 'cinnamon',
    'comino': 'cumin',
    'nuez moscada': 'nutmeg',
    'clavo': 'clove',
    'laurel': 'bay_leaf',
    'tomillo': 'thyme',
    'romero': 'rosemary',
    'albahaca': 'basil',
    'perejil': 'parsley',
    'eneldo': 'dill',
    'alcaparras': 'capers',
    'alubias': 'beans',
    'lentejas': 'lentils',
    'garbanzos': 'chickpeas',
    'cacao': 'cocoa',
    'coca': 'cola',
    'pepsi': 'cola',
    'chocolate': 'chocolate',
    'azúcar moreno': 'brown_sugar',
    'frutos secos': 'nuts',
    'pasas': 'raisins',
    'arandanos': 'blueberries',
    'fresas': 'strawberries',
    'naranjas': 'oranges',
    'limones': 'lemons',
    'uvas': 'grapes',
    'kiwi': 'kiwi',
    'mango': 'mango',
    'piña': 'pineapple',
    'sandía': 'watermelon',
    'melón': 'melon',
    'higo': 'fig',
    'ciruelas': 'plums',
    'aguacate': 'avocado',
    'nuez': 'walnut',
    'almendras': 'almonds',
    'cacahuetes': 'peanuts',
    'manteca': 'lard',
    'aceite de oliva': 'olive_oil',
    'aceite vegetal': 'vegetable_oil',
    'leche condensada': 'condensed_milk',
    'leche evaporada': 'evaporated_milk',
    'leche de almendra': 'almond_milk',
    'leche de soja': 'soy_milk',
    'leche de coco': 'coconut_milk'
};

const getIconUrl = (productName) => {
    const words = productName.toLowerCase().split(' ');
    const iconName = words.find(word => iconMap[word]) || 'product'; // 'product' es un icono genérico
    return `${ICON_BASE_URL}${iconMap[iconName] || 'product'}.png`; // Construye la URL del icono
};

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [localidadTerm, setLocalidadTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/todos/products/');
            const data = await res.json();
            setProducts(data);
            setDisplayedProducts(data.slice(0, 5)); // Muestra solo los primeros 5 productos
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        // Aplica el filtro a los productos completos
        const filteredProducts = products.filter((product) =>
            product.producto.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.localidad.toLowerCase().includes(localidadTerm.toLowerCase())
        );
        setDisplayedProducts(filteredProducts.slice(0, 5)); // Muestra solo los primeros 5 productos del filtro
    }, [searchTerm, localidadTerm, products]);

    return (
        <>
            <div className={styles.productListContainer}>
                <input 
                    type="text" 
                    placeholder="Buscar producto..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className={styles.searchInput}
                />
                <input 
                    type="text" 
                    placeholder="Buscar por localidad..." 
                    value={localidadTerm}
                    onChange={(e) => setLocalidadTerm(e.target.value)} 
                    className={styles.searchInput}
                />
                <ul className={styles.productList}>
                    {displayedProducts.map((product) => (
                        <li key={product.id} className={styles.productItem}>
                            <div className={styles.productInfo}>
                                <h3>{product.producto}</h3>
                                <p><strong>Cantidad:</strong> {product.cantidad} {product.unidad}</p>
                                <p><strong>Precio:</strong> ${product.precio}</p>
                                <p><strong>Localidad:</strong> {product.localidad}</p>
                                <p><strong>Provincia:</strong> {product.provincia}</p>
                                <p><strong>Tipo de comercio:</strong> {product.tipo_comercio}</p>
                                <p><strong>Nombre del comercio:</strong> {product.nombre_comercio}</p>
                            </div>
                            <img
                                src={getIconUrl(product.producto)} 
                                alt={product.producto}
                                className={styles.productIcon}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.addButtonContainer}>
                <Link href="/upload" passHref>
                    <button className={styles.addButton}>
                         Nuevo Producto
                    </button>
                </Link>
            </div>
        </>
    );
}
