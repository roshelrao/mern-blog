import { Box } from '@mui/material'
import React from 'react'
import Hero from '../assets/hero.png'

const HeroSection = () => {
  return (
    <Box
      sx={{
        // width: 1000,
        height: 300,
        backgroundColor: 'primary.dark',
      }}
    >
    <img src={Hero} style={{width:'100%'}}/>
    </Box>
  )
}

export default HeroSection