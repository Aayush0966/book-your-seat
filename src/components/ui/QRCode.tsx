import {useQRCode} from "next-qrcode"


const QRCode = ({ Id }: { Id: string }) => {
      const { Canvas } = useQRCode();
    
    return (
      <Canvas
      text={Id}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
        dark: '#000000', // black
        light: '#FFFFFF', // white
        },
      }}
      />
    )
}

export default QRCode