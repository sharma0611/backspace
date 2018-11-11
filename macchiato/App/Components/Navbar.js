// @flow
// libs
import React, { Component } from 'react'
import { Box, Flex, Container, Text, Hide } from 'rebass'

// components
import { padding, fontSize } from '../Theme'
// import AppStoreButton from './AppStoreButton'
import { Link } from '../../routes'

class Navbar extends Component {
    render() {
        return (
            <Box mb={[0, padding.large, padding.large]}>
                <Box bg="blue.1">
                    <Container fontSize={fontSize.caption} p={padding.small}>
                        <a href="" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Text color="white">More from Backspace 🙌 ►</Text>
                        </a>
                    </Container>
                </Box>
            </Box>
        )
    }
}

export default Navbar
