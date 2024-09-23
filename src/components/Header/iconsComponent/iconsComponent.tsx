import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { RouteNames } from '../../../enums/RouteNames';

import styles from './iconsComponent.module.scss';
import { isLinkActive } from '../isLinkActive';
import { useHandleMenuAction } from '../hooks/useHandleMenuAction';
import { useThemeContext } from '../../../context/ThemeContext';
import { themeDark, themeLight } from '../../../types/ColorTheme';
import { useFavouritesContext } from '../../../pages/FavouritesPage/context/FavouritesContext';
import { useCartContext } from '../../../pages/CartPage/context/CartContext';

interface Props {
  mobile?: boolean;
}

export const IconsComponent: FC<Props> = ({ mobile }) => {
  const { handleMenuAction } = useHandleMenuAction();
  const { theme, setTheme } = useThemeContext();

  const { favourites } = useFavouritesContext();
  const favoritesNotifications = favourites.length < 100 ? favourites.length : 99;

  const { cart } = useCartContext();
  const cartNotifications = cart.length < 100 ? cart.length : 99;

  const getIconActiveClassName = (params: { isActive: boolean }) =>
    classnames(styles.icon, isLinkActive(styles.active, params));

  return (
    <div
      className={classnames(styles.icons, {
        [styles.mobile]: mobile,
      })}
    >
      <button onClick={() => setTheme(theme === themeLight.id ? themeDark.id : themeLight.id)}>
        Switch to {theme === themeLight.id ? 'dark' : 'light'}
      </button>

      <NavLink
        to={RouteNames.favorites}
        className={getIconActiveClassName}
        onClick={handleMenuAction}
      >
        <span className="icon-heart">
          {favoritesNotifications !== 0 && (
            <div className={styles.bubble}>{favoritesNotifications}</div>
          )}
        </span>
      </NavLink>

      <NavLink to={RouteNames.cart} className={getIconActiveClassName} onClick={handleMenuAction}>
        <span className="icon-shopping-bag">
          {cartNotifications !== 0 && <div className={styles.bubble}>{cartNotifications}</div>}
        </span>
      </NavLink>
    </div>
  );
};
