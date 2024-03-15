import { Grid } from '@chakra-ui/react'
import React from 'react'
import { ReduxData } from '../Fetch'

const Filter = () => {
    const trail = ReduxData();
    if (trail) {
        return (
            <>
                <Grid gridTemplateRows={`repeat(${Math.floor(trail.length / (WindowWidth < 668 ? 2 : 3) + 1)}, ${WindowWidth < 668 ? 50 : 49}%)`} className='BoxCon'>

                </Grid>
            </>
        )
    }

}

export default Filter