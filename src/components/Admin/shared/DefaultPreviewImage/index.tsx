import ImageDefault from '../../../../assets/default.png'

const DefaultPreviewImage = ({ imageUrl }: { imageUrl: string }) => {
  console.log(imageUrl);
  return < div className="avatar mb-4" >
    <div className="w-24 rounded-xl">
      <img src={imageUrl ? imageUrl : ImageDefault} alt="Imagem do produto"  />
    </div>
  </div >
}

export default DefaultPreviewImage