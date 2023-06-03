import ProductModel, {
  ProductInputtableTypes,
} from '../../src/database/models/product.model';
import { CREATED, OK } from '../../src/constants/httpCodes';
import { ServiceData } from '../../src/types/ServiceData';
import { Product } from '../../src/types/Product';

const newProductMock: ProductInputtableTypes = {
  name: 'Novo Produto',
  orderId: 1,
  price: '10.5',
};

const productsMock: Product[] = [
  {
    id: 1,
    name: 'Excalibur',
    price: '10 peças de ouro',
    orderId: 1,
  },
  {
    id: 2,
    name: 'Espada Justiceira',
    price: '20 peças de ouro',
    orderId: 1,
  },
];

const productsInstances = productsMock.map((product) =>
  ProductModel.build(product)
);

const createdResponse: ServiceData<Product> = {
  type: null,
  status: CREATED,
  message: {
    id: 100,
    name: 'Novo Produto',
    orderId: 1,
    price: '10.5',
  },
};

const productsResponse: ServiceData<Product[]> = {
  type: null,
  status: OK,
  message: productsMock,
};

const bodyWithoutAKey = {
  price: '1 pele de Fenrir',
  orderId: 1,
};

const bodyUnpprocessable = {
  name: 'aa',
  price: 'ab',
  orderId: 1,
};

const bodyUnpprocessable2 = {
  name: 34,
  price: '10 estacas de madeira.',
  orderId: 1,
};

const correctBody = {
  name: 'Novo Produto',
  orderId: 1,
  price: '10.5',
};

export default {
  newProductMock,
  productsInstances,
  productsMock,
  createdResponse,
  productsResponse,
  bodyWithoutAKey,
  bodyUnpprocessable,
  bodyUnpprocessable2,
  correctBody,
};
