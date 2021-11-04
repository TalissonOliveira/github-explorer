const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    //source maps
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    // Arquivo de entrada
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    // Arquivo de saída
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        // tipos de arquivos que irá suportar
        extensions: ['.js', '.jsx']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],
    // Configurações de como a aplicação irá se comportar de acordo com o tipo de arquivo
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}