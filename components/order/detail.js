import Table from "../table";

export default function CartDetail({ cart, removeProductFromOrder }) {
  console.log("Full cart object:", cart);
  console.log("cart.products:", cart.products);
  console.log("cart.lineitems:", cart.lineitems);

  const headers = ["Product", "Price", ""];

  const total = cart.lineitems?.reduce((sum, lineitem) => {
    return sum + parseFloat(lineitem.product.price)
  }, 0).toFixed(2) || 0;

  const footers = ["Total", total, ""];

  return (
    <Table headers={headers} footers={footers}>
      {cart.lineitems?.map((lineitem) => {
        return (
          <tr key={lineitem.id}>
            <td>{lineitem.product.name}</td>
            <td>{lineitem.product.price}</td>
            <td>
              <span
                className="icon is-clickable"
                onClick={() => removeProductFromOrder(lineitem.id)}
              >
                <i className="fas fa-trash"></i>
              </span>
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
 