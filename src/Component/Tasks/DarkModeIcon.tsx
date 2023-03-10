import React from 'react'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react'
// import { rest } from 'lodash'


function DarkModeIconButton({
    ...rest
}: React.ComponentPropsWithoutRef<typeof IconButton>){
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    return (
        <IconButton 
        aria-label={'dark-mode-toggle'}   
        onClick={toggleColorMode}
        icon={isDark? <MoonIcon/> : <SunIcon/>}    
        {...rest} 
        />
    )
}

export default DarkModeIconButton;