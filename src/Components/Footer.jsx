import Select from 'react-select';
import React, { useState } from 'react'
import { themeOption } from '../Utils/themeOption'
import { useTheme } from '../context/ThemeContxt';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const { setTheme, theme } = useTheme()


    const handleChange = (e) => {
        setTheme(e.value);

        localStorage.setItem('theme', JSON.stringify(e.value));
    }





    return (
        <div className='footer'>
            <div className="link">
                <a href="https://github.com/Naeem-Akhter11913"><GitHubIcon /></a>
                <a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"><LinkedInIcon/></a>
            </div>
            <div className="themeButton">
                <Select
                    onChange={handleChange}
                    options={themeOption}
                    menuPlacement='top'
                    defaultValue={{ label: theme.label, value: theme }}

                    styles={{
                        control: styles => ({
                            ...styles, background: theme.background,
                            // color: theme.textColor                           
                        }),
                        menu: styles => ({
                            ...styles, background: theme.background
                        }),

                        option: (styles, { isFocused }) => ({
                            ...styles,
                            backgroundColor: (!isFocused) ? theme.background : theme.textColor,
                            color: (!isFocused) ? theme.textColor : theme.background,
                            cursor: 'ponter'
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default Footer