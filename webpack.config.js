// caperta raíz
const path = require('path'); // path es un objeto que ya esta disponible por defauld en node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');        // plugin para dar soporte a css
const CopyPlugin = require('copy-webpack-plugin');                      // soporte para archivos o directorios
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');     // minificar lo archivos de css
const TerserPlugin = require('terser-webpack-plugin');                  // minificar de mejor forma
const Dotenv = require('dotenv-webpack');                               // variables de entorno
const { CleanWebpackPlugin } = require('clean-webpack-plugin');         // clean webpack limpieza de archivos innecesarios

module.exports = {              // exportamos un modulo con un objeto con al configuración deseada
    entry: "./src/index.js",     // input para webpack
    output : {
        path: path.resolve(__dirname, 'dist'),       // con el metodo resolve se genera un pwd por así decirlo y añadimos el nombre de al carpeta
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]",      // agregar las imagenes con hash a dist images
    },
    resolve : {
        extensions : [ '.js' ],       // las extrenciones que va leer webpack como input (especificar si se usa react, babel, etc)
        alias : {
            '@utils': path.resolve(__dirname, 'src/utils/'),      // path de utils original del proyecto
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
        }
    },
    module : {
        rules: 
        [
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.m?js$/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
                use: {
                loader: "babel-loader"
                },
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/
            },


            {
                test: /\.(css|styl)$/i,                        // agregamos los archivos css y styl(preprocesador css   )
                use: [MiniCssExtractPlugin.loader, 
                    'css-loader',       // agegamos las extenciones que necesite
                ]   // agegamos los loaders que se instalaron
            },


            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,            // imagenes del proyecto
                type: 'asset/resource'
            },
            

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,                    // fonts de extensión woff https://google-webfonts-helper.herokuapp.com/fonts/
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext]",
                },
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            inject: 'body',   // permitir la inserción de los elementos (html head -> true | html body -> 'body')
            template: './public/index.html',    // template original
            filename: './index.html'            // nombre de archivo output en la carpeta /dist
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',        // optimización cons hash
        }),         // soporte para css

        // new CopyPlugin({                    // copy plugins -  carpetas o directorios OPCIONAL -- 
        //     patterns: [
        //       {
        //         from: path.resolve(__dirname, "src", "assets/images"),      // copiamos alguna carpeta en especifico
        //         to: "assets/images"                           // generamos una carpeta assets images en el dist/
        //       }
        //     ],
        //   }),

        new Dotenv(),                       // variables de entorno
        new CleanWebpackPlugin(),
    ],
    optimization: 
    {
        minimize: true,
        minimizer: 
        [
          new CssMinimizerPlugin(),
          new TerserPlugin()
        ]
    } 
}

