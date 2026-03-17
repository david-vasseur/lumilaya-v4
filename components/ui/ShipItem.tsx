import { useCartStore } from '@/lib/store/cartStore';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

interface IShipItem {
    name: string,
    price: number,
}

function ShipItem({ name, price }: IShipItem) {

    const { deleteItem } = useCartStore();

    return (
        <div className="grid grid-cols-[60%_10%_15%_15%] items-center justify-between py-4 border-b border-zinc-400">
            <div className="flex gap-5 items-center pl-2">
                <p>{name}</p>
            </div>            
            <span className="flex items-center justify-center">{price} €</span>        
        </div>
    )
}

export default ShipItem;