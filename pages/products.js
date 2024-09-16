import { useState, useEffect } from 'react';
import styles from '../styles/product-list.module.css';
import Link from 'next/link';

// URL base para los iconos
const ICON_BASE_URL = 'https://img.icons8.com/ios/50/000000/';

const iconMap = {
   'yerba': 'mate',
    'atun': 'fish',
    'leche': 'milk-bottle',
    'tomate': 'tomato',
    'pan': 'bread',
    'carne': 'meat',
    'agua': 'water',
    'queso': 'cheese',
    'crema': 'cow',
    'manzana': 'apple',
    'plátano': 'banana',
    'pollo': 'chicken',
    'arroz': 'grains-of-rice',
    'aceite': 'olive-oil',
    'azúcar': 'sugar',
    'sal': 'salt',
    'harina': 'flour',
    'huevo': 'egg',
    'cafe': 'coffee',
    'té': 'tea',
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
    'hamburguesa': 'steak',
    'pizza': 'pizza',
    'lasagna': 'lasagna',
    'sopa': 'soup',
    'caldo': 'broth',
    'pasta de dientes': 'toothpaste',
    'jabón': 'soap',
    'shampoo': 'shampoo',
    'detergente': 'detergent',
    'papel higiénico': 'paper',
    'toallas': 'towel',
    'servilletas': 'paper',
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
    'mani':'peanuts',
    'piña': 'pineapple',
    'sandía': 'watermelon',
    'melón': 'melon',
    'higo': 'fig',
    'ciruelas': 'plums',
    'aguacate': 'avocado',
    'nuez': 'walnut',
    'almendras': 'almonds',
    'cacahuetes': 'peanuts',
    'cigarrillos':'joint',
    'manteca': 'lard',
    'aceite de oliva': 'olive-oil',
    'aceite vegetal': 'olive-oil'
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
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Estado de carga
    const productsPerPage = 5;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Empieza a cargar
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/todos/products/');
                const data = await res.json();
                setProducts(data);
                setDisplayedProducts(data.slice(0, productsPerPage));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Termina de cargar
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.producto.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.localidad.toLowerCase().includes(localidadTerm.toLowerCase())
        );
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        setDisplayedProducts(filteredProducts.slice(start, end));
    }, [searchTerm, localidadTerm, products, currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Crear el rango de páginas a mostrar
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const showEllipsisBefore = startPage > 1;
    const showEllipsisAfter = endPage < totalPages;

    return (
        <>
            {loading ? (
                <div className={styles.loading}>Cargando datos...</div>
            ) : (
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
                            placeholder="Buscar barrio..." 
                            value={localidadTerm}
                            onChange={(e) => setLocalidadTerm(e.target.value)} 
                            className={styles.searchInput}
                        />
                        
                        {/* Tabla en formato grid */}
                        <div className={styles.table}>
                            <div className={styles.tableHeader}>Ref.</div>
                            <div className={styles.tableHeader}>Producto y Marca</div>
                            <div className={styles.tableHeader}>Cantidad</div>
                            <div className={styles.tableHeader}>Precio</div>
                            <div className={styles.tableHeader}>Barrio</div>
                            <div className={styles.tableHeader}>Ciudad</div>
                            <div className={styles.tableHeader}>Tipo Comercio</div>
                            <div className={styles.tableHeader}>Nombre Comercio</div>
                            

                            {displayedProducts.map((product) => (
                                <>
                                    <div className={styles.tableCell}>
                                        <img src={getIconUrl(product.producto)} alt={product.producto} className={styles.productIcon} />
                                    </div>
                                    <div className={styles.tableCell}>{product.producto}</div>
                                    <div className={styles.tableCell}>{product.cantidad} {product.unidad}</div>
                                    <div className={styles.tableCell}><strong>${product.precio}</strong></div>
                                    <div className={styles.tableCell}>{product.localidad}</div>
                                    <div className={styles.tableCell}>{product.provincia}</div>
                                    <div className={styles.tableCell}>{product.tipo_comercio}</div>
                                    <div className={styles.tableCell}>{product.nombre_comercio}</div>
                                    
                                </>
                            ))}
                        </div>
                    </div>
                   

                    {/* Paginación */}
                    <div className={styles.pagination}>
                        {showEllipsisBefore && (
                            <>
                                <button onClick={() => paginate(1)} className={styles.paginationButton}>1</button>
                                <span className={styles.ellipsis}>...</span>
                            </>
                        )}
                        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={currentPage === number ? styles.activePage : styles.paginationButton}
                            >
                                {number}
                            </button>
                        ))}
                        {showEllipsisAfter && (
                            <>
                                <span className={styles.ellipsis}>...</span>
                                <button onClick={() => paginate(totalPages)} className={styles.paginationButton}>{totalPages}</button>
                            </>
                        )}
                    </div>

                    <div className={styles.addButtonContainer}>
  
    <Link href="/upload" passHref>
        <button className={styles.addButton}>
            Nuevo Producto
        </button>
    </Link>

</div>

                </>
            )}
        </>
    );
}
