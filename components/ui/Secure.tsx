import { Leaf, Shield, Truck } from 'lucide-react';

function Secure() {
    return (
        <div className="space-y-4 border-t border-[#2C2C2C]/10 pt-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#7A9B8E]" />
                </div>
                <div>
                    <p className="font-medium text-[#2C2C2C]">Livraison offerte</p>
                    <p className="text-sm text-[#2C2C2C]/60">Dès 50€ d'achat</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#7A9B8E]" />
                </div>
                <div>
                    <p className="font-medium text-[#2C2C2C]">Garantie satisfaction</p>
                    <p className="text-sm text-[#2C2C2C]/60">Retour sous 30 jours</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-[#7A9B8E]" />
                </div>
                <div>
                    <p className="font-medium text-[#2C2C2C]">100% naturel</p>
                    <p className="text-sm text-[#2C2C2C]/60">Fabriqué en France</p>
                </div>
            </div>
        </div>
    )
}

export default Secure;