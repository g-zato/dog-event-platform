import React from 'react'
import { Paper,  Typography, Button, ButtonGroup, Avatar, MenuList, MenuItem, ListItemIcon, ListItemText, IconButton, InputBase } from '@material-ui/core'
import { Bookmark, Bookmarks, Group, LocalActivity, ConfirmationNumberOutlined, Search, AddCircle, CheckBox } from '@material-ui/icons'


export default function SearchBar(props) {
  const onChange = (event) => {
    console.log(event.target.value)
    props.updateFilter(event.target.value)
  }
    return (
        <div>
          <Paper className="search">
            <Search />
            <InputBase placeholder="Procure por um evento!"
              inputProps={{ 'aria-label': 'search' }}
              className="search-input"
              onChange={onChange}
              >
            </InputBase>
          </Paper>
        </div>
    )
}
