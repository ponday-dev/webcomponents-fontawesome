import { LitElement, svg, property } from 'lit-element';
import {
    FlipProp,
    icon,
    IconDefinition,
    IconLookup,
    IconName,
    IconPack,
    IconProp,
    library,
    PullProp,
    parse,
    SizeProp,
    Transform,
    RotateProp } from '@fortawesome/fontawesome-svg-core';

export class FontAwesome extends LitElement {

    @property({ type: String })
    icon: IconName;

    @property({ type: String })
    mask?: IconName;

    @property({ type: Boolean })
    spin = false;

    @property({ type: Boolean })
    pulse = false;

    @property({ type: Boolean })
    fixedWidth = false;

    @property({ type: Boolean })
    inverse = false;

    @property({ type: Boolean })
    border = false;

    @property({ type: Boolean })
    listItem = false;

    @property({ type: String })
    flip?: FlipProp;

    @property({ type: String })
    size?: SizeProp;

    @property({ type: Number })
    rotation?: RotateProp;

    @property({ type: String })
    pull?: PullProp;

    @property()
    transform?: string | Transform;

    @property({ type: Boolean })
    symbol = false;

    @property({ type: String })
    title = '';

    render() {
        const iconLookup = normalizeIconArgs(this.icon);
        const classes = objectWithKey('classes', [
            ...this.getClassList(),
            ...this.className.split(' ')
        ]);
        const transform = objectWithKey(
            'transform',
            typeof this.transform === 'string'
                ? parse.transform(this.transform)
                : this.transform
        );
        const mask = objectWithKey('mask', normalizeIconArgs(this.mask));

        const renderedIcon = icon(iconLookup, {
            ...classes,
            ...transform,
            ...mask,
            symbol: this.symbol,
            title: this.title
        });

        if (!renderedIcon) {
            return null;
        }
        const _template: ReadonlyArray<string> = [...renderedIcon.html];
        const template: TemplateStringsArray = Object.defineProperty(_template, 'raw', { writable: false, value: _template });
        return svg(template);
    }

    createRenderRoot() {
        return this;
    }
    
    private getClassList() {
        const classes =  {
            'fa-spin': this.spin,
            'fa-pulse': this.pulse,
            'fa-fw': this.fixedWidth,
            'fa-inverse': this.inverse,
            'fa-border': this.border,
            'fa-li': this.listItem,
            'fa-flip-horizontal': this.flip === 'horizontal' || this.flip === 'both',
            'fa-flip-vertical': this.flip === 'vertical' || this.flip === 'both',
            [`fa-${this.size}`]: !!this.size,
            [`fa-rotate-${this.rotation}`]: !!this.rotation,
            [`fa-pull-${this.pull}`]: !!this.pull
        };
        return Object.entries(classes).filter(([_, value]) => value).map(([key, _]) => key);
    }

    static use(icons: (IconDefinition | IconPack)[], name = 'fa-icon') {
        library.add(...icons);
        customElements.define(name, FontAwesome);
    }
}

function objectWithKey<T>(key: string, value: T): { [key: string]: T } {
    if (Array.isArray(value)) {
        return value.length > 0 ? { [key]: value } : {};
    } else if (value) {
        return { [key]: value };
    } else {
        return {};
    }
}

function normalizeIconArgs(icon: IconProp): IconLookup {
    if (!icon) {
        return null;
    } else if (Array.isArray(icon)) {
        const [first, ...tail] = icon;
        if (first === 'fas' || first === 'fab' || first === 'far' || first === 'fal') {
            return { prefix: first, iconName: tail[0] };
        }
    } else if (typeof icon === 'string') {
        return { prefix: 'fas', iconName: icon };
    } else if (typeof icon === 'object' && icon.iconName && icon.prefix) {
        return icon as IconLookup;
    }
}
