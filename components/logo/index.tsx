export function Logo(){

    const currentDate = new Date().toLocaleDateString();
    return(
        <>
        <img src="/logo_light.svg" alt="logo"/>
        <span>{currentDate}</span>
      </>

    )
}