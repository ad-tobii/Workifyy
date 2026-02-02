import BidCard from './BidCard'
const BidPage = () => {
  const loop_array = Array.from({ length: 10 }, (_, index) => index)
  return (
    <div className="mx-auto w-[90%] space-y-4">
      {loop_array.map(item => (
        <BidCard key={item} />
      ))}
    </div>
  )
}

export default BidPage
