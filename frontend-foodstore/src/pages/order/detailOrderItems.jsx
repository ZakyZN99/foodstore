import { DropdownButton, DropdownItem } from "react-bootstrap";
import { formatPrice } from "../../utils";

const DetailOrderItems = ({ order }) => {
    return (
        <DropdownButton variant={""} className="bg-[#FA4A0C] md:h-10 md:w-10 h-10 w-9 rounded-lg hover:bg-white border-1 border-[#FA4A0C]">
            <DropdownItem className="">
                <table className="border-collapse bg-white ">
                    <thead className="md:text-[15px] text-[12px]">
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
                    <tr className="border-b md:text-[12px] text-[10px] ">
                        <td className="p-2 text-center">{itemIndex + 1}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{formatPrice(item.price)}</td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2">{formatPrice(item.price * item.qty)}</td>
                    </tr>
                    </tbody>
                ))}
                </table>
            </DropdownItem>
        </DropdownButton>
    );
};

export default DetailOrderItems;