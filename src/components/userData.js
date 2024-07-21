import { AuthContext } from '@/context/auth';
import { apiUrl, month } from '@/utils/constants';
import {
  EditOutlined,
  Facebook,
  Instagram,
  LanguageOutlined,
  LocationOnOutlined,
  Person,
  PublicOutlined
} from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useContext } from 'react';

export default function UserData() {
  const { user } = useContext(AuthContext);

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        mt: 3,
        p: 2,
        backgroundColor: 'cardWhite',
        color: 'soot.main',
        '& > *': {
          color: 'inherit'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {user?.profile_picture ? (
          <Avatar
            alt={`${user?.first_name} ${user?.last_name}`}
            src={`${apiUrl}/${user?.profile_picture.path}`}
          />
        ) : (
          <Avatar sx={{ bgcolor: grey[50], width: 60, height: 60 }}>
            <Person
              color='tripfare'
              sx={{
                width: 30,
                height: 30
              }}
            />
          </Avatar>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
          }}
        >
          <Typography
            sx={{
              fontSize: 14
            }}
          >
            {user?.first_name} {user?.last_name}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: grey[800]
            }}
          >
            Joined {month[new Date(user?.created_at).getMonth()]}{' '}
            {new Date(user?.created_at).getFullYear()}
          </Typography>
        </Box>
        <Box>
          <IconButton aria-label='Edit name and profile picture'>
            <EditOutlined />
          </IconButton>
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ height: 100 }}>
          <Typography
            sx={{
              fontSize: 14
            }}
          >
            Bio
          </Typography>
          <Box
            sx={{
              marginTop: 2
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: grey[700]
              }}
            >
              {user?.bio ? `${user.bio}` : 'Your bio here'}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton aria-label='Edit bio'>
            <EditOutlined />
          </IconButton>
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          marginTop: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnOutlined />
            <Typography sx={{ fontSize: 14, marginLeft: 1 }}>
              {user?.address.city} {user?.address.state}
            </Typography>
          </Box>
          <Box>
            <IconButton aria-label='Edit bio'>
              <EditOutlined />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <PublicOutlined />
          <Typography sx={{ fontSize: 14, marginLeft: 1 }}>
            5 countries visited
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 4
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontSize: 16,
            fontWeight: 'medium'
          }}
        >
          Social Media
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            '& div': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          }}
        >
          <Box
            sx={{
              '& div': {
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            <Box>
              <Instagram />
              <Typography sx={{ fontSize: 14, marginLeft: 1 }}>
                {user?.instagram ? `${user.instagram}` : 'Instagram'}
              </Typography>
            </Box>
            <Box>
              <IconButton aria-label='Edit instagram'>
                <EditOutlined />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2
            }}
          >
            <Box>
              <Facebook />
              <Typography sx={{ fontSize: 14, marginLeft: 1 }}>
                {user?.facebook ? `${user.facebook}` : 'Facebook'}
              </Typography>
            </Box>
            <Box>
              <IconButton aria-label='Edit Facebook'>
                <EditOutlined />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2
            }}
          >
            <Box>
              <LanguageOutlined />
              <Typography sx={{ fontSize: 14, marginLeft: 1 }}>
                {user?.website ? `${user.website}` : 'Website'}
              </Typography>
            </Box>
            <Box>
              <IconButton aria-label='Edit website'>
                <EditOutlined />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
