const CodeQr = ({ qr, code }: { qr: string, code: string }) => {
    return <img src={qr} alt={code} className="w-48 h-48 bg-white rounded-xl border-2 border-black" />
}

export default CodeQr;