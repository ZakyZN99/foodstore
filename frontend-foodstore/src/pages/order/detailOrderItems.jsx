import { DropdownButton } from "react-bootstrap";
import { formatPrice } from "../../utils";

const DetailOrderItems = ({ order }) => {
    return (
        <DropdownButton variant={""} className="bg-[#FA4A0C] rounded-lg text-black hover:text-black hover:bg-white border-1 border-[#FA4A0C]">
        <form>
            <table className="w-[660px] border-collapse">
            <thead>
                <tr className="border-b ">
                <th className="p-2">No.</th>
                <th className="p-2">Nama Barang</th>
                <th className="p-2">Harga</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Total Harga</th>
                </tr>
            </thead>
            {order.order_item.map((item, itemIndex) => (
                <tbody key={item._id}>
                <tr className="border-b ">
                    <td className="p-2">{itemIndex + 1}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{formatPrice(item.price)}</td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{formatPrice(item.price * item.qty)}</td>
                </tr>
                </tbody>
            ))}
            </table>
        </form>
        </DropdownButton>
    );
};

export default DetailOrderItems;