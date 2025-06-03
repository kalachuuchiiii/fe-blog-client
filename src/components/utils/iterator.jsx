const Iterator = ({list = [], Child }) => {

return <div className = "flex flex-col w-full gap-1">
  {
    list.length > 0 && list.map((data) => <Child data = {data} />) 
  }
</div>

}

export default Iterator