const agenda = async (req, res) =>{
    console.log(req.query)

    res.status(200).json({ name: 'Jteste' })
}

export default agenda