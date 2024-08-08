import axios from 'axios';

async function getShopifyOrders() {
  
  const url = `https://39745f14f7693da04d59f19f9940d619:858d0d941d23130ef479fd7c70eee802@229f8c-f4.myshopify.com/admin/api/2023-04/orders.json`;

  try {
    const response = await axios.get(url);
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching Shopify orders:', error);
    throw new Error('Failed to fetch orders');
  }
}

console.log(getShopifyOrders())